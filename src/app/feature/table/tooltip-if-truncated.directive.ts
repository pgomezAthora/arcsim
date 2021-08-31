import { Directive, ElementRef, OnInit } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
    selector: '[matTooltip][appTooltipIfTruncated]'
})
export class TooltipIfTruncatedDirective implements OnInit {
    constructor(private matTooltip: MatTooltip, private elementRef: ElementRef<HTMLElement>) {}

    public ngOnInit(): void {
        // Wait for DOM update
        setTimeout(() => {
            console.log('tooltip dir', this.elementRef.nativeElement);
            const element = this.elementRef.nativeElement;
            console.log(
                'tooltip dir. scroll: ',
                element.scrollWidth,
                '\t client: ',
                element.clientWidth,
                'result: ',
                element.scrollWidth <= element.clientWidth
            );
            this.matTooltip.disabled = element.scrollWidth <= element.clientWidth;
        });
    }
}
