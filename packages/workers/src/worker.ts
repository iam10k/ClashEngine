import { Client, logger, Variables } from 'camunda-external-task-client-js';

// configuration for the Client:
//  - 'baseUrl': url to the Workflow Engine
//  - 'logger': utility to automatically log important events
const config = { baseUrl: 'http://localhost:8080/engine-rest', use: logger, asyncResponseTimeout: 10000 };

// create a Client instance with custom configuration
const client = new Client(config);

let c1 = 0;
let c2 = 0;

// // subscribe to the topic: 'testTopic'
client.subscribe('matchMaking', async ({ task, taskService }) => {
  c1 = 0;
  c2 = 0;
  console.log('matchMaking', task.id);
  console.log(new Date().toISOString());

  const variables = new Variables();
  variables.setTyped('match', {
    type: 'json',
    value: { id: 0 },
    valueInfo: {}
  });

  variables.setTyped('users', {
    type: 'json',
    value: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
    valueInfo: {}
  });

  // Put your business logic
  // complete the task
  await taskService.complete(task, variables);
});

client.subscribe('addToQueue', async ({ task, taskService }) => {
  // Put your business logic
  // complete the task
  console.log('addToQueue', task.id);
  await taskService.complete(task);
});

client.subscribe('sendMatchRequest', async ({ task, taskService }) => {
  // Put your business logic
  // complete the task
  console.log('sendMatchRequest', task.id);
  console.log(new Date().toISOString());
  if (++c1 <= 3) {
    await taskService.complete(task);
  }
});

client.subscribe('acceptRequest', async ({ task, taskService }) => {
  // Put your business logic
  // complete the task
  if (++c2 <= 2) {
    await taskService.complete(task);
  }
});

client.subscribe('declineMatch', async ({ task, taskService }) => {
  // Put your business logic
  // complete the task
  console.log('declineMatch', task.id);
  console.log(new Date().toISOString());
  await taskService.complete(task);
});

client.subscribe('startMatch', async ({ task, taskService }) => {
  // Put your business logic
  // complete the task
  console.log('startMatch', task.id);
  await taskService.complete(task);
});

client.subscribe('removeFromQueue', async ({ task, taskService }) => {
  // Put your business logic
  // complete the task
  console.log('removeFromQueue', task.id);
  await taskService.complete(task);
});

client.subscribe('addBackToQueue', async ({ task, taskService }) => {
  // Put your business logic
  // complete the task
  console.log('addBackToQueue', task.id);
  await taskService.complete(task);
});

client.subscribe('compensationA', async ({ task, taskService }) => {
  // Put your business logic
  // complete the task
  console.log('compensationA', task.id);
  await taskService.complete(task);
});

client.subscribe('compensationB', async ({ task, taskService }) => {
  // Put your business logic
  // complete the task
  console.log('compensationB', task.id);
  await taskService.complete(task);
});
