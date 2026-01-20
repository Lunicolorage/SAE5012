<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class MeController extends AbstractController
{
    public function __invoke()
    {
        return $this->getUser();
    }
}

//permet de se connecter, ajout d'une requête API en récupérant les informations à partir du token