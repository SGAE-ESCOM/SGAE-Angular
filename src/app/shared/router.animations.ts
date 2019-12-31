import { trigger, state, style, transition, animate, query, stagger, keyframes } from '@angular/animations';

export function cardAnimation() {
    // Trigger animation cards array
    return trigger('cardAnimation', [
        // Transition from any state to any state
        transition('* => *', [
            // Initially the all cards are not visible
            query(':enter', style({ opacity: 0 }), { optional: true }),
            // Each card will appear sequentially with the delay of 300ms
            query(':enter', stagger('75ms', [
                animate('350ms ease-in', keyframes([
                    style({ opacity: 0, transform: 'scale3d(.3, .3, .3)' }),
                    style({ opacity: 1, transform: 'scale3d( 1,  1,  1)' }),
                ]))
            ]), { optional: true })
        ]),
    ])
}

export function fadeInDown() {
    return trigger('fadeInDown', [
        transition(':enter', [
            style({ opacity: '0', transform: 'translate3d(0,-100%,0)' }),
            animate('.15s .1s ease-in-out', style({ opacity: '1', transform: 'translateZ(0)' }))
        ])
    ]);
}

export function moveIn() {
    return trigger('moveIn', [
        state('void', style({ width: '100%' })),
        state('*', style({ width: '100%' })),
        transition(':enter', [
            style({ opacity: '0', transform: 'translateX(100px)' }),
            animate('.6s ease-in-out', style({ opacity: '1', transform: 'translateX(0)' }))
        ]),
        transition(':leave', [
            style({ opacity: '1', transform: 'translateX(0)' }),
            animate('.3s ease-in-out', style({ opacity: '0', transform: 'translateX(-200px)' }))
        ])
    ]);
}

export function fallIn() {
    return trigger('fallIn', [
        transition(':enter', [
            style({ opacity: '0', transform: 'translateY(-40px)' }),
            animate('.1s .1s ease-in-out', style({ opacity: '1', transform: 'translateY(0)' }))
        ]),
        transition(':leave', [
            style({ opacity: '1', transform: 'translateY(0)' }),
            animate('.1s .1s ease-in-out', style({ opacity: '0', transform: 'translateY(-40px)' }))
        ])
    ]);
}

export function moveInLeft() {
    return trigger('moveInLeft', [
        transition(':enter', [
            style({ opacity: '0', transform: 'translateX(-100px)' }),
            animate('.6s .2s ease-in-out', style({ opacity: '1', transform: 'translateX(0)' }))
        ])
    ]);
}