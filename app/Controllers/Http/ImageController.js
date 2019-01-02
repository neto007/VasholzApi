'use strict'
const Helpers = use('Helpers')
const Image = use('App/Models/Image')
const History = use('App/Models/History')


class ImageController {
    async store ({ params, request }) {
        const history = await History.findOrFail(params.id)
    
        const images = request.file('image', {
        types: ['image'],
        size: '2mb'
        })
    
        await images.moveAll(Helpers.tmpPath('uploads'), file => ({
        name: `${Date.now()}-${file.clientName}`
        }))
    
        if (!images.movedAll()) {
        return images.errors()
        }
    
        await Promise.all(
        images
            .movedList()
            .map(image => history.images().create({ path: image.fileName }))
        )
    }
}

module.exports = ImageController