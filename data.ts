import { Asset, FilterCategory, SchemaField, OwnerDetails, UserRequest, TechDatabase } from './types';

export const RECENT_ASSETS: Asset[] = [
  {
    id: '1',
    title: 'Real-time Transaction Monitoring',
    description: 'Real-time feed of transaction logs for fraud detection.',
    owner: 'Security Analytics',
    type: 'Dataset',
    tags: ['security', 'fraud', 'real-time'],
    updatedAt: '2 hours ago',
    classification: 'Confidential'
  }
];

export const NEW_ASSETS: Asset[] = [
  {
    id: '2',
    title: 'Inventory Levels',
    description: 'Real-time snapshot of inventory levels across all distribution centers.',
    owner: 'Operations',
    type: 'Dataset',
    tags: ['inventory', 'logistics', 'real-time'],
    updatedAt: '1 day ago'
  },
  {
    id: '3',
    title: 'Website Traffic Analysis',
    description: 'Comprehensive analysis of website traffic sources, page views, and conversion funnels.',
    owner: 'Marketing Analytics',
    type: 'Report',
    tags: ['web', 'traffic', 'marketing'],
    updatedAt: '3 days ago'
  },
  {
    id: '4',
    title: 'Employee Satisfaction Survey Q3',
    description: 'Results from the quarterly employee satisfaction survey.',
    owner: 'HR Analytics',
    type: 'Dataset',
    tags: ['hr', 'survey'],
    updatedAt: '1 month ago'
  },
  {
    id: '5',
    title: 'API Gateway Logs',
    description: 'Raw logs from the API gateway, useful for debugging and performance monitoring.',
    owner: 'SRE Team',
    type: 'API',
    tags: ['logs', 'infrastructure'],
    updatedAt: 'streaming'
  }
];

export const CATALOG_ASSETS: Asset[] = [
  {
    id: '6',
    title: 'Customer Churn Predictions',
    description: 'Weekly predictions of customer churn based on usage patterns and support interactions.',
    owner: 'AI/ML Team',
    type: 'Model',
    tags: ['customer', 'churn', 'AI'],
    updatedAt: '2 days ago'
  },
  {
    id: '7',
    title: 'Product Usage Analytics',
    description: 'Aggregated data on feature adoption, user flows, and engagement metrics.',
    owner: 'Data Science Team',
    type: 'Dataset',
    tags: ['product', 'usage', 'telemetry'],
    updatedAt: '5 days ago'
  },
  {
    id: '8',
    title: 'Q3 Financial Report',
    description: 'Official financial results for the third quarter of 2025.',
    owner: 'Finance Department',
    type: 'Report',
    tags: ['finance', 'quarterly', 'official'],
    updatedAt: '1 week ago'
  },
  {
    id: '100', // The detailed one
    title: 'Customer Demographics Q3 2025',
    description: 'Anonymized demographic data of our user base, including region and platform.',
    owner: 'Marketing Analytics Team',
    domain: 'Sales & Marketing',
    type: 'Dataset',
    tags: ['users', 'demographics', 'research'],
    updatedAt: '2025-09-01',
    classification: 'Confidential',
    certification: 'Gold',
    qualityScore: 98.5,
    sampleData: [
      { CURRENCY: 'USD', COMPANY_NAME: 'Acme Corp', COMPANY_ID: 'C-1029', WEALTH_QFY: 8, AMOUNT: 15000.50 },
      { CURRENCY: 'EUR', COMPANY_NAME: 'Global Tech', COMPANY_ID: 'C-9921', WEALTH_QFY: 9, AMOUNT: 42000.00 },
      { CURRENCY: 'GBP', COMPANY_NAME: 'Local Shop', COMPANY_ID: 'C-4412', WEALTH_QFY: 4, AMOUNT: 1250.75 },
      { CURRENCY: 'USD', COMPANY_NAME: 'MegaCorp', COMPANY_ID: 'C-8811', WEALTH_QFY: 10, AMOUNT: 950000.00 },
      { CURRENCY: 'ZAR', COMPANY_NAME: 'StartUp Inc', COMPANY_ID: 'C-2234', WEALTH_QFY: 6, AMOUNT: 8500.00 },
    ],
    lineage: {
      upstream: ['MDM_Customer_Master', 'CRM_Salesforce_Extract'],
      downstream: ['Marketing_Campaign_Dashboard', 'Churn_Prediction_Model']
    }
  },
  ...NEW_ASSETS // Include new assets in catalog too
];

export const FILTERS: FilterCategory[] = [
  {
    name: 'Domain',
    options: ['Sales & Marketing', 'Product Development', 'Finance', 'User Research', 'Supply Chain', 'Fraud & Security']
  },
  {
    name: 'Certification',
    options: ['Gold', 'Silver', 'Bronze']
  },
  {
    name: 'Format',
    options: ['Dataset', 'Report', 'Model', 'API']
  }
];

export const DEMO_SCHEMA: SchemaField[] = [
  { name: 'CURRENCY', type: 'varchar(3)', nullable: true, controlType: 'N/A', description: 'Currency code for the transaction' },
  { name: 'COMPANY_NAME', type: 'varchar(15)', nullable: true, controlType: 'N/A', description: 'Name of the company' },
  { name: 'COMPANY_ID', type: 'varchar(10)', nullable: true, controlType: 'N/A', description: 'Unique identifier for the company' },
  { name: 'WEALTH_QFY', type: 'integer', nullable: true, controlType: 'N/A', description: 'Wealth quantifier indicator' },
  { name: 'AMOUNT', type: 'decimal(11,2)', nullable: true, controlType: 'N/A', description: 'Transaction amount value' },
];

export const DEMO_OWNERSHIP: OwnerDetails = {
  pipelineOwner: 'Marketing Analytics Team',
  dataSteward: 'John Doe',
  approverGroup: 'Marketing Data Approvers',
  notificationEmail: 'market-data-consumers@example.com',
  accessLink: 'Request via Access Central',
  sla: 'Data to be used for internal analytics only. 99.5% uptime SLA.'
};

export const MOCK_REQUESTS: UserRequest[] = [
  {
    id: 'REQ-001',
    assetId: '100',
    assetTitle: 'Customer Demographics Q3 2025',
    status: 'Approved',
    requestedAt: '2025-09-10',
    justification: 'Required for Q4 marketing campaign planning.',
    environment: 'Production'
  },
  {
    id: 'REQ-002',
    assetId: '6',
    assetTitle: 'Customer Churn Predictions',
    status: 'Pending',
    requestedAt: '2025-09-15',
    justification: 'Testing new retention models in development.',
    environment: 'Development'
  }
];

export const TECH_CATALOG_DATA: TechDatabase[] = [
  {
    id: 'db-1',
    name: 'npintdedatamngt',
    type: 'Glue',
    accountId: 'edla-glue-dev.131405913869',
    updatedAt: '3/26/2026',
    schemas: [
      {
        id: 'sch-1',
        name: 'afs1-dev-sveng-master-list_rl',
        tables: [
          {
            id: 'tbl-1',
            name: 'test_lf',
            type: 'EXTERNAL',
            description: 'Used to Test LF Permissions',
            format: 'Parquet',
            service: 'AWS Glue URSA Major Non Prod',
            updatedAt: '1mo ago',
            updatedBy: 'ingestion-bot',
            location: 's3://edla-np-data/raw/test_lf',
            columns: [
              { name: 'test', type: 'string', description: 'Test column identifier' },
              { name: 'bla', type: 'string', description: 'Additional test payload' }
            ]
          },
          {
            id: 'tbl-2',
            name: 'customer_events_raw',
            type: 'INTERNAL',
            description: 'Raw clickstream events from web properties.',
            format: 'JSON',
            service: 'AWS Glue URSA Major Non Prod',
            updatedAt: '2d ago',
            updatedBy: 'pipeline-etl',
            location: 's3://edla-np-data/raw/customer_events',
            columns: [
              { name: 'event_id', type: 'string' },
              { name: 'timestamp', type: 'timestamp' },
              { name: 'user_id', type: 'string' },
              { name: 'event_type', type: 'string' }
            ]
          }
        ]
      },
      {
        id: 'sch-2',
        name: 'afs1-dev-sveng-cisco_rl',
        tables: []
      },
      {
        id: 'sch-3',
        name: 'afs1-dev-sveng-cmdb_rl',
        tables: []
      }
    ]
  },
  {
    id: 'db-2',
    name: 'default',
    type: 'Hive',
    accountId: 'hive-metastore.default',
    updatedAt: '3/17/2026',
    schemas: [
      {
        id: 'sch-4',
        name: 'public',
        tables: [
          {
            id: 'tbl-3',
            name: 'legacy_users',
            type: 'EXTERNAL',
            description: 'Archived user records from legacy system.',
            format: 'CSV',
            service: 'CDAIO-Hive Metastore',
            updatedAt: '1yr ago',
            updatedBy: 'admin',
            location: 'hdfs://cdaio-cluster/hive/legacy_users',
            columns: [
              { name: 'id', type: 'int' },
              { name: 'username', type: 'string' },
              { name: 'created_at', type: 'date' }
            ]
          }
        ]
      }
    ]
  }
];
