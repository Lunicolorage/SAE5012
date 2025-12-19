<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\VariableRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: VariableRepository::class)]
#[ApiResource]
class Variable
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'variables')]
    #[ORM\JoinColumn(nullable: false)]
    private ?JeuDonnee $idDonnees = null;

    #[ORM\Column(length: 255)]
    private ?string $nom = null;

    #[ORM\Column(length: 255)]
    private ?string $type = null;

    /**
     * @var Collection<int, GraphiqueVariable>
     */
    #[ORM\OneToMany(targetEntity: GraphiqueVariable::class, mappedBy: 'idVariable', orphanRemoval: true)]
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

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): static
    {
        $this->nom = $nom;

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
            $graphiqueVariable->setIdVariable($this);
        }

        return $this;
    }

    public function removeGraphiqueVariable(GraphiqueVariable $graphiqueVariable): static
    {
        if ($this->graphiqueVariables->removeElement($graphiqueVariable)) {
            // set the owning side to null (unless already changed)
            if ($graphiqueVariable->getIdVariable() === $this) {
                $graphiqueVariable->setIdVariable(null);
            }
        }

        return $this;
    }
}
