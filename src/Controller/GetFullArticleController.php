<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpKernel\Attribute\AsController;
use App\Entity\Article;
use App\Repository\ArticleRepository;

#[AsController]
final class GetFullArticleController extends AbstractController
{
    private ArticleRepository $repository;

    public function __construct(ArticleRepository $repository)
    {
        $this->repository = $repository;
    }

    public function __invoke(Article $data): Response
    {
        $res = $this->repository->getFullArticle($data->getId());
        return $this->json($res);
    }
}
