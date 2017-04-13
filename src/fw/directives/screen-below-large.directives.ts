import { Directive, Input, TemplateRef, ViewContainerRef,OnDestroy } from '@angular/core';

import { ScreenService } from '../services/screen.service';
import { Subscription} from 'rxjs/Subscription';

@Directive({selector: '[screenBelowLarge]'})
export class ScreenBelowLarge implements OnDestroy{
  private hasview = false;
  private screenSubscription: Subscription;

  constructor(private viewContainer: ViewContainerRef,
              private template: TemplateRef<Object>,
              private screenService: ScreenService){

                this.screenSubscription = screenService.resize$.subscribe(() => this.onResize());
              }

 @Input()
 set screenBelowLarge(condition){
   condition = this.screenService.screenWidth < this.screenService.largeBreakpoint;

   if(condition && !this.hasview){
     this.hasview = true;
     this.viewContainer.createEmbeddedView(this.template);
   }else if(!condition && this.hasview){
     this.hasview = false;
     this.viewContainer.clear();
   }
 }

 ngOnDestroy(){
   this.screenSubscription.unsubscribe();
 }

 onResize(){
   this.screenBelowLarge = false;
 }


}
