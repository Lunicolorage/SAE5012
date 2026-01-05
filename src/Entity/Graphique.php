<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\GraphiqueRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: GraphiqueRepository::class)]
#[ApiResource]
class Graphique
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'graphiques')]
    #[ORM\JoinColumn(nullable: false)]
    private ?JeuDonnee $idDonnees = null;

    #[ORM\OneToOne(inversedBy: 'graphique', cascade: ['persist', 'remove'])]
    private ?Section $idSection = null;

    #[ORM\Column(length: 255)]
    private ?string $type = null;

    /**
     * @var Collection<int, GraphiqueVariable>
     */
    #[ORM\OneToMany(targetEntity: GraphiqueVariable::class, mappedBy: 'idGraphique', orphanRemoval: true)]
    private Collection $graphiqueVariables;

    public function __construct()
    {
        $this->graphiqueVariables = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIdDonnees(): ?JeuDonnee
    {
        return $this->idDonnees;
    }

    public function setIdDonnees(?JeuDonnee $idDonnees): static
    {
        $this->idDonnees = $idDonnees;

        return $this;
    }

    public function getIdSection(): ?Section
    {
        return $this->idSection;
    }

    public function setIdSection(?Section $idSection): static
    {
        $this->idSection = $idSection;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): static
    {
        $this->type = $type;

        return $this;
    }


    /**
     * @return Collection<int, GraphiqueVariable>
     */
    public function getGraphiqueVariables(): Collection
    {
        return $this->graphiqueVariables;
    }

    public function addGraphiqueVariable(GraphiqueVariable $graphiqueVariable): static
    {
        if (!$this->graphiqueVariables->contains($graphiqueVariable)) {
            $this->graphiqueVariables->add($graphiqueVariable);
            $graphiqueVariable->setIdGraphique($this);
        }

        return $this;
    }

    public function removeGraphiqueVariable(GraphiqueVariable $graphiqueVariable): static
    {
        if ($this->graphiqueVariables->removeElement($graphiqueVariable)) {
            // set the owning side to null (unless already changed)
            if ($graphiqueVariable->getIdGraphique() === $this) {
                $graphiqueVariable->setIdGraphique(null);
            }
        }

        return $this;
    }
}
