<?php

namespace App\Controller;

use App\Entity\Image;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class MediaController
{
    #[Route('/api/media', methods: ['POST'])]
    public function upload(Request $request, EntityManagerInterface $em): JsonResponse {
        $file = $request->files->get('file');

        $extension = $file->guessExtension() ?? 'webp'; // récupère l'extension du fichier, si reconnait pas -> met en webp
        $filename = uniqid() . '.' . $extension; // avoir un nom d'image unique

        $file->move( // déplace l'image du fichier temporaire dans le bon dossier 
            __DIR__ . '/../../public/media', // chemin absolu
            $filename
        );

        $image = new Image();
        $image->setUrl('/media/'.$filename);
        $image->setCreatedAt(new \DateTimeImmutable());

        $em->persist($image);
        $em->flush();

        return new JsonResponse([
            'id' => $image->getId(),
            'url' => $image->getUrl(),
        ]);
    }
}