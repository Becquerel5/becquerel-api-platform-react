<?php

namespace App\Events;

use App\Entity\User;
use App\Entity\Customer;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Invoice;
use App\Repository\InvoiceRepository;
use DateTime;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\Security;

class InvoiceChronoSubscriber implements EventSubscriberInterface{
   
   
    private $security;
    private $repository;

   
   public function __construct(Security $security,InvoiceRepository $repository)
   {
       $this->security = $security;
       $this->repository = $repository;
   }
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['SetChronoForInvoice',EventPriorities::PRE_VALIDATE]
        ];
    }

    
     public function SetChronoForInvoice(ViewEvent  $event)
     {
         //dd($this->repository->findNextChrono($this->security->getUser()));
       $invoice = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();  // post get put
       
       if ($invoice instanceof Invoice && $method === "POST") {
           $nextChrono = $this->repository->findNextChrono($this->security->getUser());
           $invoice->setChrono($nextChrono);
         //dd($invoice);
         if (empty($invoice->getSentAt())) {
             # code...
             $invoice->setSentAt(new \DateTime('now'));
         }
        }
     }
}