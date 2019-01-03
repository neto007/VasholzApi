'use strict'

const History = use('App/Models/History')

class HistoryController {


  async index ({ request}) {
    const histories = History.query()
    .with('images')
    .fetch()
    return histories
  }

  async store ({ auth,request, response }) {
    const {id} = auth.user
    const data =  request.only([
        'title',
        'historia'
    ])
    const history = await History.create({ ...data,history_id: id})
    return history
  }

  async show ({ params}) {
    const history  = await History.findOrFail(params.id)
    await history.load('images')
    return history
  }

  async update ({ params, request, response }) {
    const history =  await History.findOrFail(params.id)
    const data = request.only([
        'title',
        'historia'])
    history.merge(data)
    await history.save()
    return history
  }

  async destroy ({ params, auth, response }) {
    const history = await History.findOrFail(params.id)
    if(history.history_id !== auth.user.id){
      return response.status(401).send({error: 'não autorizado'})
    }
    await history.delete()
  }
}

module.exports = HistoryController
