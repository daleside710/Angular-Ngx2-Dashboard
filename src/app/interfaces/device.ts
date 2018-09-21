export class Cert {
  CertID: string;
  Issuer: string;
  IssueDate: string;
  ExpiryDate: string;
}

export class Device {
  DevID: string;
  DevAddress: number;
  Status: number;
  GatewayID: number;
  DevAuth: boolean;
  DevBlocked: boolean;
  DevConnected: boolean;
  LastSeen: string;
  Cert: Cert;
}
