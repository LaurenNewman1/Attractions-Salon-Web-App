import morgan from 'morgan'

const production = (app) => {
  app.use(morgan('dev'))
}

export default production