<?php

namespace App\State;

use App\Entity\Article;
use App\Entity\Section;
use App\Entity\Titre;
use App\Entity\Texte;
use App\Entity\Image;
use App\Repository\UserRepository;
use App\Repository\ImageRepository;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use Doctrine\ORM\EntityManagerInterface;

class ArticleProcessor implements ProcessorInterface
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private UserRepository $userRepository,
        private ImageRepository $imageRepository,
    ) {}

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): mixed
    {
        if (!$data instanceof Article) {
            return $data;
        }

        // Récupérer l'utilisateur
        $userName = $data->getUserName();
        if ($userName) {
            $user = $this->userRepository->findOneBy(['nom' => $userName]);
            if (!$user) {
                throw new \Exception("Utilisateur '$userName' non trouvé");
            }
            $data->setUser($user);
        }

        // Définir la date de création
        if (!$data->getCreatedAt()) {
            $data->setCreatedAt(new \DateTimeImmutable());
        }

        // Persister l'article d'abord
        $this->entityManager->persist($data);
        $this->entityManager->flush();

        // Traiter les sections APRÈS que l'article soit persisté
        $ordre = 1;
        foreach ($data->getSections() as $section) {
            // Définir l'ordre ET l'article AVANT de persister
            $section->setOrdre($ordre);
            $section->setArticle($data);
            $this->entityManager->persist($section);
            $ordre++;
        }
        
        // Flush une seule fois après tous les sets
        $this->entityManager->flush();

        // Maintenant traiter le contenu des sections (titres, textes, images)
        foreach ($data->getSections() as $section) {
            $contenuData = $section->getContenu();

            match ($section->getType()) {
                'titre' => $this->processTitre($section, $contenuData),
                'texte' => $this->processTexte($section, $contenuData),
                'image' => $this->processImage($section, $contenuData),
                default => throw new \Exception("Type de section inconnu: {$section->getType()}")
            };
        }

        return $data;
    }

    private function processTitre(Section $section, ?array $contenuData = null): void
    {
        if (!$contenuData) {
            return;
        }

        $titre = new Titre();
        $titre->setTexte($contenuData['texte'] ?? '');
        $titre->setHierarchie($contenuData['hierarchie'] ?? 'h2');
        $titre->setSection($section);

        $this->entityManager->persist($titre);
        $this->entityManager->flush();
    }

    private function processTexte(Section $section, ?array $contenuData = null): void
    {
        if (!$contenuData) {
            return;
        }

        $texte = new Texte();
        $texte->setContenu($contenuData['contenu'] ?? '');
        $texte->setSection($section);

        $this->entityManager->persist($texte);
        $this->entityManager->flush();
    }

    private function processImage(Section $section, ?array $contenuData = null): void
    {
        if (!$contenuData || !isset($contenuData['url'])) {
            return;
        }

        // Chercher si l'image existe par ID
        if (isset($contenuData['id'])) {
            $image = $this->imageRepository->find($contenuData['id']);
        } else {
            $image = null;
        }

        if (!$image) {
            // Créer une nouvelle image
            $image = new Image();
            $image->setUrl($contenuData['url']);
            $image->setAlt($contenuData['alt'] ?? '');
            $image->setCreatedAt(new \DateTimeImmutable());
            $this->entityManager->persist($image);
            $this->entityManager->flush();
        }

        // Lier l'image à la section
        $section->addImage($image);
        $this->entityManager->persist($section);
        $this->entityManager->flush();
    }
}