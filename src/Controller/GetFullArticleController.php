<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpKernel\Attribute\AsController;
use App\Entity\Article;

#[AsController]
final class GetFullArticleController extends AbstractController
{
    public function __construct()
    {
    }

    public function __invoke($data): Response
    {
        return $this->json('Full article data');
    }
}
