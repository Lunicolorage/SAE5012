<?php

namespace App\Entity;

use App\Repository\TitreRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TitreRepository::class)]
class Titre
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $hierarchie = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $texte = null;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?section $section = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getHierarchie(): ?string
    {
        return $this->hierarchie;
    }

    public function setHierarchie(string $hierarchie): static
    {
        $this->hierarchie = $hierarchie;

        return $this;
    }

    public function getTexte(): ?string
    {
        return $this->texte;
    }

    public function setTexte(string $texte): static
    {
        $this->texte = $texte;

        return $this;
    }

    public function getSection(): ?section
    {
        return $this->section;
    }

    public function setSection(section $section): static
    {
        $this->section = $section;

        return $this;
    }
}
