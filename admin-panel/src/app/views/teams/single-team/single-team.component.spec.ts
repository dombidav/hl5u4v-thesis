import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SingleTeamComponent } from './single-team.component'

describe('SingleWorkerComponent', () => {
    let component: SingleTeamComponent
    let fixture: ComponentFixture<SingleTeamComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SingleTeamComponent],
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(SingleTeamComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
