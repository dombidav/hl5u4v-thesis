import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AccessRulesComponent } from './access-rules.component'

describe('WorkersComponent', () => {
    let component: AccessRulesComponent
    let fixture: ComponentFixture<AccessRulesComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AccessRulesComponent],
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(AccessRulesComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
