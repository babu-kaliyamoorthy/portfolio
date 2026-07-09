import { createTopicCollection } from '@/lib/content';
import { sslPinning } from './ssl-pinning';
import { oauth } from './oauth';
import { biometricAuth } from './biometric-auth';
import { encryptedStorage } from './encrypted-storage';
import { rootDetection } from './root-detection';
import { sessionTimeout } from './session-timeout';

const securityTopics = [sslPinning, oauth, biometricAuth, encryptedStorage, rootDetection, sessionTimeout];

export const { getAll: getSecurityTopics, getBySlug: getSecurityTopic, getSlugs: getSecuritySlugs } =
  createTopicCollection(securityTopics);
