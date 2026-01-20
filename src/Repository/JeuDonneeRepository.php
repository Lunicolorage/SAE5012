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
            'SELECT v.id, v.nom, v.valeurs, v.type
            FROM App\Entity\JeuDonnee j
            JOIN j.variables v
            WHERE j.id LIKE :id
            ORDER BY v.nom ASC
        ')->setParameter('id', $idJeu);
        return $query->getResult();
    }

}
