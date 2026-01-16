<?php

namespace App\Repository;

use App\Entity\JeuDonnee;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<JeuDonnee>
 */
class JeuDonneeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, JeuDonnee::class);
    }

    public function getVariables(int $idJeu): array
    {
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery(
            'SELECT v.id, v.nom
            FROM App\Entity\JeuDonnee j
            JOIN j.variables v
            WHERE j.id LIKE :id
            ORDER BY v.nom ASC
        ')->setParameter('id', $idJeu);
        return $query->getResult();
    }

//    /**
//     * @return JeuDonnee[] Returns an array of JeuDonnee objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('j')
//            ->andWhere('j.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('j.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?JeuDonnee
//    {
//        return $this->createQueryBuilder('j')
//            ->andWhere('j.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
