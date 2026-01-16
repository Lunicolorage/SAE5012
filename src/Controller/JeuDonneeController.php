<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpKernel\Attribute\AsController;
use App\Entity\JeuDonnee;
use App\Repository\JeuDonneeRepository;

#[AsController]
final class JeuDonneeController extends AbstractController
{
    private JeuDonneeRepository $repository;

    public function __construct(JeuDonneeRepository $repository)
    {
        $this->repository = $repository;
    }

    public function __invoke(JeuDonnee $data): Response
    {
        $res = $this->repository->getVariables($data->getId()); // faire passer l'id
        return $this->json($res);
    }
}
