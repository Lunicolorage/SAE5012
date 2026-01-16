<?php

namespace App\Controller;

use App\Entity\JeuDonnee;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Repository\UserRepository;


class FileController extends AbstractController
{
    #[Route('/api/datasets', name:'api_datasets', methods: ['POST'])]
    public function upload(Request $request, EntityManagerInterface $em, UserRepository $userR): JsonResponse {
        $file = $request->files->get('lien');

        if (!$file) {
            return new JsonResponse(['error' => 'Aucun fichier reçu'], 400);
        }

        $userId = $request->request->get('user');
        $user = $userR->find($userId);

        if (!$user) {
            return  new JsonResponse(['error' => 'User introuvable'], 400);
        }

        $nom = $request->request->get('nom');

        // $extension = $file->guessExtension() ?? 'csv'; // récupère l'extension du fichier, si reconnait pas -> met en csv
        $extension = 'csv';
        $filename = uniqid() . '.' . $extension; // avoir un nom unique

        $file->move( // déplace dans le bon dossier 
            __DIR__ . '/../../public/datasets', // chemin absolu
            $filename
        );

        $dataset = new JeuDonnee();
        $dataset->setLien('http://localhost:8000/datasets/'.$filename);
        $dataset->setUser($user);
        $dataset->setNom($nom);
        $dataset->setCreatedAt(new \DateTimeImmutable());

        $em->persist($dataset);
        $em->flush();

        return new JsonResponse([
            'id' => $dataset->getId(),
            'lien' => $dataset->getLien(),
            'user' => $dataset->getUser(),
            'nom' => $dataset->getNom(),
        ]);
    }
}