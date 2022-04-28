import {rest} from 'msw'

const base_url = 'https://api.todoist.com';
const rest_url = `${base_url}/rest/v1`;

const handlers = [
    rest.get(`${rest_url}/tasks`, (req, res, ctx) => {
        return res(ctx.json([{
            id: 2995104339,
            content: 'Buy Milk'
        }]))
    }),

    rest.get(`${base_url}/sync/v8/completed/get_all`, (req, res, ctx) => {
        return res(ctx.json({
            items: [{
                id: 2995104339,
                content: 'Buy Milk'
            }]
        }))
    }),

    rest.post(`${rest_url}/tasks`, (req, res, ctx) => {
        return res(ctx.json([{
            id: 2995104339,
            content: 'Buy Milk'
        }]))
    }),

    rest.post(`${rest_url}/tasks/${2995104339}`, (req, res, ctx) => {
        return res(ctx.json({
            items: [{
                id: 2995104339,
                content: 'Buy Milk'
            }]
        }))
    }),

    rest.delete(`${rest_url}/tasks/${2995104339}`, (req, res, ctx) => {
        return res(ctx.json({
            items: [{
                id: 2995104339,
                content: 'Buy Milk'
            }]
        }))
    })
]

export default handlers;