import amqp from 'amqplib';

export const publishNewItemEvent = async (item: any) => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue('newItemAdded');
  channel.sendToQueue('newItemAdded', Buffer.from(JSON.stringify(item)));
  console.log('Published new item event:', item.name);
};
