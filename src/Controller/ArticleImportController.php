<?php

namespace App\Controller;

use App\Entity\Article;
use App\Repository\ArticleRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/articles', name: 'app_articles')]
class ArticleImportController extends AbstractController
{
    #[Route('/import', name: 'import', methods: ['POST'])]
    public function import(
        Request $request,
        ArticleRepository $articleRepository
    ): JsonResponse {
        try {
            $data = json_decode($request->getContent(), true);

            if (!$data) {
                return $this->json([
                    'error' => 'Invalid JSON'
                ], 400);
            }

            $article = new Article();
            $savedArticle = $articleRepository->saveArticleFromJson($article, $data);

            return $this->json([
                'success' => true,
                'message' => 'Article importé avec succès',
                'article' => [
                    'id' => $savedArticle->getId(),
                    'titre' => $savedArticle->getTitre(),
                    'resume' => $savedArticle->getResume()
                ]
            ], 201);

        } catch (\Exception $e) {
            return $this->json([
                'error' => $e->getMessage()
            ], 400);
        }
    }

    #[Route('/{id}/full', name: 'full', methods: ['GET'])]
    public function getFull(
        int $id,
        ArticleRepository $articleRepository
    ): JsonResponse {
        $article = $articleRepository->getFullArticle($id);
        
        if (isset($article['error'])) {
            return $this->json($article, 404);
        }

        return $this->json($article);
    }
}