<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\GraphiqueVariableRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: GraphiqueVariableRepository::class)]
#[ApiResource]
class GraphiqueVariable
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'graphiqueVariables')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Graphique $idGraphique = null;

    #[ORM\ManyToOne(inversedBy: 'graphiqueVariables')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Variable $idVariable = null;

    #[ORM\Column(length: 255)]
    private ?array $couleur = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIdGraphique(): ?Graphique
    {
        return $this->idGraphique;
    }

    public function setIdGraphique(?Graphique $idGraphique): static
    {
        $this->idGraphique = $idGraphique;

        return $this;
    }

    public function getIdVariable(): ?Variable
    {
        return $this->idVariable;
    }

    public function setIdVariable(?Variable $idVariable): static
    {
        $this->idVariable = $idVariable;

        return $this;
    }

    public function getCouleur(): ?array
    {
        return $this->couleur;
    }

    public function setCouleur(array|string $couleur): static
    {
        $this->couleur = is_array($couleur) ? $couleur : [$couleur];

        return $this;
    }
}
