import { Get, Controller } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    @Post('google-login')
    @AuthNotRequired()
    @UseGuards(JwtAuthGuard)
    async googleLogin(
        @CurrentUser() user: User,
        @Body('accessToken') accessToken: string,
    ) {
        return this.authService.loginWithThirdParty(
            'googleId',
            () => this.googleService.getUser(accessToken),
            user,
        );
    }
}
