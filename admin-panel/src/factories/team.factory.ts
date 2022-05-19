import { ITeam } from '../types/team.interface'

export function teamFactory(properties: Partial<ITeam> = {}): ITeam {
    return {
        id: properties.id || '',
        name: properties.name || '',
        created_at: properties.created_at || '',
        updated_at: properties.updated_at || '',
    }
}
