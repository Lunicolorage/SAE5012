<?php

namespace App\Controller;

use App\Entity\Image;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


class MediaController extends AbstractController
{
    #[Route('/api/media', name:'api_media', methods: ['POST'])]
    public function upload(Request $request, EntityManagerInterface $em): JsonResponse {
        $file = $request->files->get('file');

        if (!$file) {
            return new JsonResponse(['error' => 'Aucun fichier reçu'], 400);
        }

        $alt = $request->request->get('alt');

        if (!$alt) {
            return $this->json([
                'error' => 'Le champ alt est obligatoire'
            ], 400);
        }

        $extension = $file->guessExtension() ?? 'webp'; // récupère l'extension du fichier, si reconnait pas -> met en webp
        $filename = uniqid() . '.' . $extension; // avoir un nom d'image unique

        $file->move( // déplace l'image du fichier temporaire dans le bon dossier 
            __DIR__ . '/../../public/media', // chemin absolu
            $filename
        );

        $image = new Image();
        $image->setUrl('http://localhost:8000/media/'.$filename);
        $image->setAlt($alt);
        $image->setCreatedAt(new \DateTimeImmutable());

        $em->persist($image);
        $em->flush();

        return new JsonResponse([
            'id' => $image->getId(),
            'url' => $image->getUrl(),
            'alt' => $image->getAlt(),
        ]);
    }
}