import Review from "../model/review";

export const create = async (req, res) => {
    try {
        const params = req.body;
        let date = "";
        if(params.time) {
            date = new Date(params.time);
        }
        const body = {...params, time: date};
        const review = await Review.create(body);
        res.status(200).type('json').send(review);
    } catch(err) {
        res.status(403).type('json').send(err);
    }
};

export const update = async (req, res) => {
    try {
        const params = req.body;
        let date;
        if(params.time) {
            date = new Date(params.time);
        }
        const updatedBody = {...params, time: date};
        const review = await Review.findByIdAndUpdate(req.params.someId, updatedBody).exec();

        if(review) {
            res.status(200).type('json').send(review);
        } else {
            res.status(404).type('json').send({ error: 'Review not found' })
        }
    } catch(err) {
        res.status(500).type('json').send(err);
    }
};

export const remove = async (req, res) => {
    try {
        let data = await Review.deleteOne({ _id: req.params.someId });
        if (data.length === 0) {
            data = { error: 'Review not found' };
            res.status(404).send(data);
        } else {
            data = { message: 'Review deleted'};
            res.status(200).send(data);
        }
    } catch (err) {
        res.status(400).type('json').send(err);
    }
};

export const read = async (req, res) => {
    try {
        const data = await Review.findById(req.params.someId).exec();
        if(data.length === 0) {
            res.status(404).type('json').send({ error: 'Review not found!' });
        } else {
            res.status(200).type('json').send(data);
        }
    } catch(err) {
        res.status(400).type('json').send(err);
    }
};

export const readall = async(req, res) => {
    try{
        const data = await Review.find({});
        res.status(200).send(data);
    } catch {
        res.status(400).type('json').send(err);
    }
}