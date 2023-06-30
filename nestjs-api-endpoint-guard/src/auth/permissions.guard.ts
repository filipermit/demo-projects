// auth/permissions.guard.ts

import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Permit } from 'permitio';

// This line initializes the SDK and connects your app
// to the Permit.io Cloud PDP.

const permit = new Permit({
    pdp: "https://cloudpdp.api.permit.io",
    // your API Key
    token: "PERMIT_KEY_HERE",
});

@Injectable()
export class PermissionsGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    

    // Add the authorization logic here with Permit.io.
    // If the user has the necessary permissions, return true.
    // If the user does not have the necessary permissions, throw an UnauthorizedException.

    const userHasPermission = await permit.check("demo_user@gmail.com", "view", "protected-page");

    console.log(userHasPermission);

    if (!userHasPermission) {
      throw new UnauthorizedException('You do not have the necessary permissions.');
    }
    return true;
  }
}
