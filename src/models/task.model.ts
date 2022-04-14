export interface Task {
    id: number
    section_id: number
    project_id: number
    label_ids: number[]
    content: string
    description: string
    priority: number
    url: string
    order: number
    creator: number
    created: string
    completed: boolean
    assigner: number
    completed_date?: string
}