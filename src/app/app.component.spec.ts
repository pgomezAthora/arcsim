import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let fixture: AppComponent;

    beforeEach(() => {
        fixture = new AppComponent();
    });

    it(`should have as title 'ArcsimPlatformUI'`, () => {
        expect(fixture.title).toEqual('ArcsimPlatformUI');
    });
});
