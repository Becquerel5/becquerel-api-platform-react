<?php

namespace App\Events;

use App\Entity\User;
use App\Entity\Customer;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\Security;

class CustomerUserSubscriber implements EventSubscriberInterface{
   
   
    private $security;

   
   public function __construct(Security $security)
   {
       $this->security = $security;
   }
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['SetUserForCustomer',EventPriorities::PRE_VALIDATE]
        ];
    }

    
     public function SetUserForCustomer(ViewEvent  $event)
     {
       $customer = $event->getControllerResult();
       $method = $event->getRequest()->getMethod();  // post get put
       
       if ($customer instanceof Customer && $method === "POST") {
           $user = $this->security->getUser();
           $customer->setUser($user);
          // $hash = $this->encoder->encodePassword($customer, $customer->getPassword);

          // dd($customer);
        }
     }
}