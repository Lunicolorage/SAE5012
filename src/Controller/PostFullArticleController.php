<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpKernel\Attribute\AsController;
use App\Entity\Article;
use App\Repository\ArticleRepository;

#[AsController]
final class PostFullArticleController extends AbstractController
{   
   private ArticleRepository $repository;

    public function __construct(ArticleRepository $repository)
    {
        $this->repository = $repository;
    }

    public function __invoke(Article $article): Article
    {
        $this->articlePublishingHandler->handle($article);

        return $article;
    }
}
