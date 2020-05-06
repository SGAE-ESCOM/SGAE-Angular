import * as admin from 'firebase-admin';

export const ADMIN_PARAMS = {
    type: "service_account",
    projectId: "sgae-escom",
    privateKeyId: "d052bdba345f339d0150ac3f9459c52741df86ca",
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC+83l80IxlxjNu\nsfrbFUq7/JqL3NgysG7zokWBIKdEISsMBB/cQMc+9eeXe6VsNfHZIGNoylFCP5DD\nBAXSI7KsXTOrdLldFd8wTE6xgQKT6tovSHcWKkfiPkYhktQSzQRdYizsItVf9VzE\nNJqmfTJNT7mFSOF1WaZX+OBzq2kXbchR0i7/Mx4AWL2Q4S/zghMcxoLx/LIE/StH\nU6h0NnR88HUX5RDHP2UmYnoRtGcqonk5I5tLLrJzAo06ACfwbcLJsFQO7zMC6p80\nUzu7/mS6lwdX8ho03V7xLT6S3fnxRtw0TgRZYfzzpEq1mepBoQI5+1AkMfLdd5NX\nyMInVLItAgMBAAECggEAB11tNWT20VMadz3KouoYkpUc4eGf/h6DfQaofyFDClPs\nLN+42d4uwS0rZFKa0AhpnloLM4bAKRm6C+eLEO6bDN5gaI/NOXunOt3qmBqVfp6L\nkVDOdQ6m7KFBw7g90UbSkQaBHI+AYt3cGN49i8fe6Y/2ZB9qQMQ3MAPzpkp5eHOM\nq9HbqJMRH1/zK1r9sEKAN0gqL0oFr8ipJuNb/5rj+fQjZvbf4jTujgpJ41qNUAa5\nNWSrIQ7osuLyNwNnPAjpyqMN9iBoi+bfVv4AiJsUS1yQ5pJwhGmz4mQGtGGAG4pL\nsBb7vCuLvSqge41EBRPAPp9O5s2uxs1IpO5k1ZHWCQKBgQDxkJ51XoDZO5MtpKhU\nVQy4WpftX+1zLLb/KO3035T3JWxlkd1e6wiZ/M4feF3KnTJlXkW1X77SCLfgk+i+\nt2y6MUqBcJAZn6hDP7cBXWFBnfWnYjuPUncR0fIN3S+CEbkH2CXbxulGbwea7EE0\nOS776NlifYT1B+7N9vS0nUbVWQKBgQDKXJTgS+5Un8x4ROxqXgCi9wJn81BkxFaV\n5Xqm2UgheaJbUXCbSvPZXoMRfR0e4vYrFf+/T4TdhjQuT7DyBvvvzY7N3Zsp3UER\nm4Dn/v98cXANYXYfPjwKBG1wUgFdG2R8Y2F5GKIx0z2zPLMrH6+kzRa8JCXhp9pN\nsvWMXZok9QKBgEMMDs8o0b55qJoMj6QIjyVED9MUwwUqrggYRiOnQuNuAa4XVEga\nGCMVZeiaMf4gr3IvPk3fK0mEnfS5WOpGYuky8SkIIxbZl4xCzPqV/n6F5z70Ju/a\nxa2uhe6PK7aAUMj6l1du2CRygLvhQx/Jl17X/C44BIU2FHQaTUUsOhLRAoGBAJaV\nTjOaTT+rqfvVThfY26BpLuErridN8yCYIy0Fgydl2+sYLzNgExUtv1rEP2c8fPKS\n7Dzwb25o72uG4aU4jUFlNV78CPqeKk1v6fy5RGTWBQvv+nZFWWga41UxsNIYEC5/\nxYjXS9rH1qIKCUmNyqZX9xMJ0yaYQVqQUSiifpIBAoGBAK93/5MTh2vPwk/MKb5t\nO7fW7g478FRNAYpwLv/CDESd+S4tEnlfbQCGNzvi0t6Zj4Z/skx1yy0Ds6x4WKhi\nHRB2j8J5lph5bb5OkfFbWtRqqKUjiARXn8HR5jRjpABtTqbiE0Omzyw+lhybz6ra\n4BYbHRxU8oR8RWIa7bN0eUbD\n-----END PRIVATE KEY-----\n",
    clientEmail: "firebase-adminsdk-blg2q@sgae-escom.iam.gserviceaccount.com",
    clientId: "102558054245557085186",
    authUri: "https://accounts.google.com/o/oauth2/auth",
    tokenUri: "https://oauth2.googleapis.com/token",
    authProviderX509CertUrl: "https://www.googleapis.com/oauth2/v1/certs",
    clientC509CertUrl: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-blg2q%40sgae-escom.iam.gserviceaccount.com"
}


// {
//     "type": "service_account",
//     "project_id": "sgae-escom",
//     "private_key_id": "d052bdba345f339d0150ac3f9459c52741df86ca",
//     "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC+83l80IxlxjNu\nsfrbFUq7/JqL3NgysG7zokWBIKdEISsMBB/cQMc+9eeXe6VsNfHZIGNoylFCP5DD\nBAXSI7KsXTOrdLldFd8wTE6xgQKT6tovSHcWKkfiPkYhktQSzQRdYizsItVf9VzE\nNJqmfTJNT7mFSOF1WaZX+OBzq2kXbchR0i7/Mx4AWL2Q4S/zghMcxoLx/LIE/StH\nU6h0NnR88HUX5RDHP2UmYnoRtGcqonk5I5tLLrJzAo06ACfwbcLJsFQO7zMC6p80\nUzu7/mS6lwdX8ho03V7xLT6S3fnxRtw0TgRZYfzzpEq1mepBoQI5+1AkMfLdd5NX\nyMInVLItAgMBAAECggEAB11tNWT20VMadz3KouoYkpUc4eGf/h6DfQaofyFDClPs\nLN+42d4uwS0rZFKa0AhpnloLM4bAKRm6C+eLEO6bDN5gaI/NOXunOt3qmBqVfp6L\nkVDOdQ6m7KFBw7g90UbSkQaBHI+AYt3cGN49i8fe6Y/2ZB9qQMQ3MAPzpkp5eHOM\nq9HbqJMRH1/zK1r9sEKAN0gqL0oFr8ipJuNb/5rj+fQjZvbf4jTujgpJ41qNUAa5\nNWSrIQ7osuLyNwNnPAjpyqMN9iBoi+bfVv4AiJsUS1yQ5pJwhGmz4mQGtGGAG4pL\nsBb7vCuLvSqge41EBRPAPp9O5s2uxs1IpO5k1ZHWCQKBgQDxkJ51XoDZO5MtpKhU\nVQy4WpftX+1zLLb/KO3035T3JWxlkd1e6wiZ/M4feF3KnTJlXkW1X77SCLfgk+i+\nt2y6MUqBcJAZn6hDP7cBXWFBnfWnYjuPUncR0fIN3S+CEbkH2CXbxulGbwea7EE0\nOS776NlifYT1B+7N9vS0nUbVWQKBgQDKXJTgS+5Un8x4ROxqXgCi9wJn81BkxFaV\n5Xqm2UgheaJbUXCbSvPZXoMRfR0e4vYrFf+/T4TdhjQuT7DyBvvvzY7N3Zsp3UER\nm4Dn/v98cXANYXYfPjwKBG1wUgFdG2R8Y2F5GKIx0z2zPLMrH6+kzRa8JCXhp9pN\nsvWMXZok9QKBgEMMDs8o0b55qJoMj6QIjyVED9MUwwUqrggYRiOnQuNuAa4XVEga\nGCMVZeiaMf4gr3IvPk3fK0mEnfS5WOpGYuky8SkIIxbZl4xCzPqV/n6F5z70Ju/a\nxa2uhe6PK7aAUMj6l1du2CRygLvhQx/Jl17X/C44BIU2FHQaTUUsOhLRAoGBAJaV\nTjOaTT+rqfvVThfY26BpLuErridN8yCYIy0Fgydl2+sYLzNgExUtv1rEP2c8fPKS\n7Dzwb25o72uG4aU4jUFlNV78CPqeKk1v6fy5RGTWBQvv+nZFWWga41UxsNIYEC5/\nxYjXS9rH1qIKCUmNyqZX9xMJ0yaYQVqQUSiifpIBAoGBAK93/5MTh2vPwk/MKb5t\nO7fW7g478FRNAYpwLv/CDESd+S4tEnlfbQCGNzvi0t6Zj4Z/skx1yy0Ds6x4WKhi\nHRB2j8J5lph5bb5OkfFbWtRqqKUjiARXn8HR5jRjpABtTqbiE0Omzyw+lhybz6ra\n4BYbHRxU8oR8RWIa7bN0eUbD\n-----END PRIVATE KEY-----\n",
//     "client_email": "firebase-adminsdk-blg2q@sgae-escom.iam.gserviceaccount.com",
//     "client_id": "102558054245557085186",
//     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//     "token_uri": "https://oauth2.googleapis.com/token",
//     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//     "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-blg2q%40sgae-escom.iam.gserviceaccount.com"
//   }
  