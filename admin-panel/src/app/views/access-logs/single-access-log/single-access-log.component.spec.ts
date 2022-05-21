import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SingleAccessLogComponent } from './single-access-log.component'

describe('SingleWorkerComponent', () => {
    let component: SingleAccessLogComponent
    let fixture: ComponentFixture<SingleAccessLogComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SingleAccessLogComponent],
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(SingleAccessLogComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
