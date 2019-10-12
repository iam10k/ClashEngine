import { Client, logger } from 'camunda-external-task-client-js';

// configuration for the Client:
//  - 'baseUrl': url to the Workflow Engine
//  - 'logger': utility to automatically log important events
const config = { baseUrl: 'http://localhost:8080/engine-rest', use: logger };

// create a Client instance with custom configuration
const client = new Client(config);

// subscribe to the topic: 'testTopic'
client.subscribe('testTopic', async ({ task, taskService }) => {
  // Put your business logic
  // complete the task
  await taskService.complete(task);
});
