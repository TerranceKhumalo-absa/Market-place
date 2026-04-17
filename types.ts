export interface Asset {
  id: string;
  title: string;
  description: string;
  owner: string;
  type: 'Dataset' | 'Report' | 'Model' | 'API';
  tags: string[];
  updatedAt: string;
  viewCount?: number;
  qualityScore?: number;
  classification?: 'Confidential' | 'Public' | 'Internal';
  certification?: 'Gold' | 'Silver' | 'Bronze';
  domain?: string;
  sampleData?: any[];
  lineage?: {
    upstream: string[];
    downstream: string[];
  };
}

export interface SchemaField {
  name: string;
  type: string;
  nullable: boolean;
  controlType: string;
  description: string;
}

export interface OwnerDetails {
  pipelineOwner: string;
  dataSteward: string;
  approverGroup: string;
  notificationEmail: string;
  accessLink: string;
  sla: string;
}

export interface FilterCategory {
  name: string;
  options: string[];
}

export type RequestStatus = 'Pending' | 'Approved' | 'Rejected';

export interface UserRequest {
  id: string;
  assetId: string;
  assetTitle: string;
  status: RequestStatus;
  requestedAt: string;
  justification: string;
  environment: string;
}

export interface TechColumn {
  name: string;
  type: string;
  description?: string;
  constraint?: string;
}

export interface TechTable {
  id: string;
  name: string;
  type: 'EXTERNAL' | 'INTERNAL' | 'VIEW';
  description: string;
  format: string; // e.g., 'Parquet', 'CSV'
  columns: TechColumn[];
  updatedAt: string;
  updatedBy: string;
  service: string;
  location: string;
}

export interface TechSchema {
  id: string;
  name: string;
  tables: TechTable[];
}

export interface TechDatabase {
  id: string;
  name: string;
  type: 'Glue' | 'Hive' | 'Redshift';
  accountId: string;
  updatedAt: string;
  schemas: TechSchema[];
}
