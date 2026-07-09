import { createTopicCollection } from '@/lib/content';
import { bankingAppArchitecture } from './banking-app-architecture';
import { paymentGatewayIntegration } from './payment-gateway-integration';
import { notificationSystem } from './notification-system';
import { deepLinkArchitecture } from './deep-link-architecture';
import { featureFlagRollout } from './feature-flag-rollout';
import { microservicesIntegration } from './microservices-integration';

const systemDesignTopics = [
  bankingAppArchitecture,
  paymentGatewayIntegration,
  notificationSystem,
  deepLinkArchitecture,
  featureFlagRollout,
  microservicesIntegration,
];

export const { getAll: getSystemDesignTopics, getBySlug: getSystemDesignTopic, getSlugs: getSystemDesignSlugs } =
  createTopicCollection(systemDesignTopics);
