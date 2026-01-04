<?php

namespace App\Repository;

use App\Entity\Article;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Article>
 */
class ArticleRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Article::class);
    }

    public function getFullArticle(int $id): array
    {
        $article = $this->find($id);
        if (!$article) {
            return ['error' => 'Article not found'];
        }

        return [
            'id' => $article->getId(),
            'titre' => $article->getTitre(),
            'resume' => $article->getResume(),
            'createdAt' => $article->getCreatedAt()?->format('c'),
            'updatedAt' => $article->getUpdatedAt()?->format('c'),
            'user' => [
                'id' => $article->getUser()->getId(),
                'nom' => $article->getUser()->getNom(),
            ],
            'sections' => array_map(function ($section) {
                switch ($section->getType()) {
                    case 'texte':
                        $texte = $this->getEntityManager()
                            ->getRepository(\App\Entity\Texte::class)
                            ->findOneBy(['section' => $section->getId()]);
                        
                        $contenu = $texte ? [
                            'id' => $texte->getId(),
                            'contenu' => $texte->getContenu(),
                        ] : null;
                        break;

                    case 'image':
                        $contenu = $section->getImages();

                        break;
                    case 'titre':
                        $titre = $this->getEntityManager()
                            ->getRepository(\App\Entity\Titre::class)
                            ->findOneBy(['section' => $section->getId()]);

                        $contenu = $titre ? [
                            'id' => $titre->getId(),
                            'texte' => $titre->getTexte(),
                            'hierarchie' => $titre->getHierarchie(),
                        ] : null;
                        break;
                        $contenu = null;
                        break;

                        // ajouter graph
                        case 'graphique':
                            $graphique = $this->getEntityManager()
                                ->getRepository(\App\Entity\Graphique::class)
                                ->findOneBy(['idSection'=>$section->getId()]);

                            $variables = [];
                            foreach($graphique->getGraphiqueVariables() as $gv){
                                $variables[] = [
                                    'id' => $gv->getId(),
                                    'variableId'=> $gv->getIdVaraiable()->getId(),
                                    'nom'=> $gv->getIdVariable()->getNom(),
                                    'couleur'=> $gv->getCouleur(),
                                ];
                            }

                            $contenu = $graphique ? [
                                'id' => $graphique->getId(),
                                'type' => $graphique->getType(),
                                'jeuDonneeId' => $graphique->getIdDonnees()->getId(),
                                'variables' => $variables
                            ] : null;
                            break;
                            $contenu = null;
                            break;
                    default:
                        $contenu = null;
                }
                return [
                    'id' => $section->getId(),
                    'ordre' => $section->getOrdre(),
                    'type' => $section->getType(),
                    'contenu' => $contenu,
                ];
            }, $article->getSections()->toArray()),
             
        ];
    }

    /*
    JE N'UTILISE PLUS LA FONCTION SUIVANTE
    fichier recuperer
            {
        "titre": "Test 1",
        "resume": "Article de test 1",
        "user": {
            "nom": "noah"
        },
        "sections": [
            {
            "type": "titre",
            "contenu": {
                "texte": "Titre 1 section 1",
                "hierarchie": "h2"
                }
            },
            {
            "type": "texte",
            "contenu": {
                "contenu": "Texte 1 section 2"
                }
            },
            {
            "type": "image",
            "contenu":
                {
                "url": "https://img.20mn.fr/VPI0zCt8QlSApRWU4so8DSk/1444x920_cat-and-dog-near-christmas-tree",
                "alt": "chient et chat noel",
                }
            }
        ]
    }

    */

     public function saveArticleFromJson(Article $article, array $data): Article
    {
        $article->setTitre($data['titre'] ?? null);
        $article->setResume($data['resume'] ?? null);
        // $article->setCreatedAt(new \DateTimeImmutable());

        // // Récupérer l'utilisateur
        // $userRepository = $this->getEntityManager()->getRepository(\App\Entity\User::class);
        // $user = $userRepository->findOneBy(['nom' => $data['user']['nom']]);
        // if (!$user) {
        //     throw new \Exception("Utilisateur '{$data['user']['nom']}' non trouvé");
        // }
        // $article->setUser($user);

        $this->getEntityManager()->persist($article);
        $this->getEntityManager()->flush();

        // Traiter les sections
        $ordre = 1;
        foreach ($data['sections'] as $sectionData) {
            $this->createSection($article, $sectionData, $ordre);
            $ordre++;
        }

        return $article;
    }

    private function createSection(Article $article, array $sectionData, int $ordre): void
    {
        $section = new \App\Entity\Section();
        $section->setType($sectionData['type']);
        $section->setOrdre($ordre);
        $section->setArticle($article);

        $this->getEntityManager()->persist($section);
        $this->getEntityManager()->flush();

        // Traiter le contenu selon le type
        match ($sectionData['type']) {
            'titre' => $this->createTitre($section, $sectionData['contenu']),
            'texte' => $this->createTexte($section, $sectionData['contenu']),
            'image' => $this->linkImage($section, $sectionData['contenu']),
            'graphique' => $this->creationGraphique($section, $sectionData['contenu']),
            default => throw new \Exception("Type de section inconnu: {$sectionData['type']}")
        };
    }

    private function createTitre(\App\Entity\Section $section, array $contenu): void
    {
        $titre = new \App\Entity\Titre();
        $titre->setTexte($contenu['texte']);
        $titre->setHierarchie($contenu['hierarchie']);
        $titre->setSection($section);

        $this->getEntityManager()->persist($titre);
        $this->getEntityManager()->flush();
    }

    private function createTexte(\App\Entity\Section $section, array $contenu): void
    {
        $texte = new \App\Entity\Texte();
        $texte->setContenu($contenu['contenu']);
        $texte->setSection($section);

        $this->getEntityManager()->persist($texte);
        $this->getEntityManager()->flush();
    }

    private function linkImage(\App\Entity\Section $section, array $contenu): void
    {
        $imageRepository = $this->getEntityManager()->getRepository(\App\Entity\Image::class);
        $image = $imageRepository->find($contenu['id']);
        
        if (!$image) {
            // Créer l'image si elle n'existe pas
            $image = new \App\Entity\Image();
            $image->setUrl($contenu['url']);
            $image->setAlt($contenu['alt']);
            $image->setCreatedAt(new \DateTimeImmutable());
            $this->getEntityManager()->persist($image);
            $this->getEntityManager()->flush();
        }

        // Lier l'image à la section
        $section->addImage($image);
        $this->getEntityManager()->persist($section);
        $this->getEntityManager()->flush();
    }

    private function createGraphique(\App\Entity\Section $section, array $contenu): void
    {
        $manager = $this->getEntityManager();

        // Récupérer le jeu de données
        $jeuDonnee = $manager->getRepository(\App\Entity\JeuDonnee::class)
            ->find($contenu['jeuDonneeId']);

        if (!$graphique){
            // Créer le graphique
            $graphique = new \App\Entity\Graphique();
            $graphique->setType($contenu['type']);
            $graphique->setIdSection($section);
            $graphique->setIdDonnees($jeuDonnee);

            $manager->persist($graphique);
            $manager->flush();
        }
        
        // S'occuper de la liaison entre graphique et variable (GraphiqueVariable)
        foreach ($contenu['variables'] as $varData){
            $variable = $manager->getRepository(\App\Entity\Variable::class)
                ->find($varData['variableId']);
            
            $gv = new \App\Entity\GraphiqueVariable();
            $gv->setIdGraphique($graphique);
            $gv->setIdVariable($variable);
            $gv->setCouleur($varData['couleur']);

            $manager->persist($gv);
        }

        $manager->flush();
    }


//    /**
//     * @return Article[] Returns an array of Article objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('a.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Article
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
