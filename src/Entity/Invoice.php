<?php

namespace App\Entity;

use App\Entity\User;
use DateTimeInterface;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\InvoiceRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;



/**
 * @ORM\Entity(repositoryClass=InvoiceRepository::class)
 * @ApiResource(
 *  subresourceOperations={
 *      "api_customers_invoices_get_subresource"={
 *          "normalization_context"={"groups"={"invoices_subresource"}}
 *  }  
 * },
 *  itemOperations={"GET","PUT","DELETE","PATCH","increment"={
 *      "method"="post",
 *      "path"="/invoices/{id}/increment",
 *      "controller"="App\Controller\InvoiceIncrementationController",
 *      "swagger_context"={
 *          "summary"="Incrementerrr une facture",
 *          "description"="Incrementerrr le chrono d'une facture donners"
 *      }
 *    }
 * },
 *  attributes={
 *      "pagination_enabled"=false,
 *      "pagination_items_per_page"=7,
 *      "order": {"sentAt":"desc"}
 *  },
 *  normalizationContext={
 *      "groups"={"invoices_read"}
 *  },
 *  denormalizationContext={"disable_type_enforcement"=true} 
 * )
 * @ApiFilter(OrderFilter::class, properties={"sentAt":"partial","amount"})
 */
class Invoice
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"invoices_read","customers_read","invoices_subresource"})
     */
    private $id;

    /**
     * @ORM\Column(type="float")
     * @Groups({"invoices_read","customers_read","invoices_subresource"})
     * @Assert\Type(type="numeric" ,message="le montant doit etre numeric")
     * @Assert\NotBlank(message="le motant de la facture est obligatoire")
     */
    private $amount;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"invoices_read","customers_read","invoices_subresource"})
     * @Assert\NotBlank(message="le date de d'envoie est obligatoire ET doit etre au format YYY-MM-DD")
     */
    private $sentAt;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"invoices_read","customers_read","invoices_subresource"})
     * @Assert\NotBlank(message="le status de la facture est obligatoire")
     * @Assert\Choice(choices={"SENT","PAID","CANCELLED"},message="le statut doit etre SENT,PAID ou CANCELLED")
     */
    private $status;

    /**
     * @ORM\ManyToOne(targetEntity=Customer::class, inversedBy="invoices")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"invoices_read"})
     * @Assert\NotBlank(message="le customer de la facture est obligatoire")
     */
    private $customer;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"invoices_read","customers_read","invoices_subresource"})
     * @Assert\NotBlank(message="le chrono de la facture est obligatoire")
     * @Assert\Type(type="integer",message="le chrono de la facture doit etre un nombre")
     */
    private $chrono;

   /**
    * take all user per invoice
    * @Groups({"invoices_read","invoices_subresource"})
    * @return User
    */
    public function getUser(): User
    {
        return $this->customer->getUser();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    public function setAmount($amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getSentAt(): ?\DateTimeInterface
    {
        return $this->sentAt;
    }

    public function setSentAt($sentAt): self
    {
        $this->sentAt = $sentAt;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getCustomer(): ?Customer
    {
        return $this->customer;
    }

    public function setCustomer(?Customer $customer): self
    {
        $this->customer = $customer;

        return $this;
    }

    public function getChrono(): ?int
    {
        return $this->chrono;
    }

    public function setChrono($chrono): self
    {
        $this->chrono = $chrono;

        return $this;
    }
}
