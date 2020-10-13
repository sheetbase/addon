import {fetchPost} from './fetch.service';
import {getSettingWebhookUrl} from './project.service';

export function emitWebhookEvent(
  event: string,
  data: unknown,
  resourceUrl = ''
) {
  const webhookUrl = getSettingWebhookUrl();
  if (!webhookUrl) {
    throw new Error('No webhook!');
  }
  // send request
  const response = fetchPost(webhookUrl, {
    contentType: 'application/json',
    payload: JSON.stringify({event, resource: resourceUrl, data}),
  });
  // return the resource url
  return (
    resourceUrl || (JSON.parse(response.getContentText())['url'] as string)
  );
}
