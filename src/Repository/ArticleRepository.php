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
