'use strict'

const History = use('App/Models/History')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with histories
 */
class HistoryController {
  /**
   * Show a list of all histories.
   * GET histories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request}) {

    const histories = History.query()
    .with('images')
    .fetch()


    return histories
  
  }

  /**
   * Create/save a new history.
   * POST histories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ auth,request, response }) {
    const {id} = auth.user
    const data =  request.only([
        'title',
        'historia'
    ])

    const history = await History.create({ ...data,history_id: id})

    return history
        
  }

  /**
   * Display a single history.
   * GET histories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params}) {

    const history  = await History.findOrFail(params.id)
    await history.load('images')
    
    return history
  }

  /**
   * Update history details.
   * PUT or PATCH histories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    
    const history =  await History.findOrFail(params.id)

    const data = request.only([
        'title',
        'historia'])

    history.merge(data)

    await history.save()
    
    return history

  }

  /**
   * Delete a history with id.
   * DELETE histories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth, response }) {

    const history = await History.findOrFail(params.id)

    if(history.history_id !== auth.user.id){
      return response.status(401).send({error: 'não autorizado'})
    }
    await history.delete()
  }
}

module.exports = HistoryController
