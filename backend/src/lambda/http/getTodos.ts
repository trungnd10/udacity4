import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { getAllTodos } from '../../helpers/todos'
import { getUserId } from '../utils';
import { createLogger } from '../../utils/logger'

// TODO: Get all TODO items for a current user
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    createLogger(`Event: ${event}`);

    // Write your code here
    const userId = getUserId(event)
    const todos = await getAllTodos(userId)

    return {
      statusCode: 200,
      body: JSON.stringify({ items: todos })
    }
  })

handler.use(
  cors({
    credentials: true
  })
)