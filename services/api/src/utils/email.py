def send_verification_email(email: str, token: str):
    """
    Mock email sender for account verification.
    In production, integrate with SendGrid, AWS SES, or Mailgun.
    """
    verification_link = f"http://localhost:5173/verify-email?token={token}"
    print(f"\n{'='*50}\n[MOCK EMAIL] To: {email}\nSubject: Verify your SpecPulse Account\nPlease click the link to verify your email: {verification_link}\n{'='*50}\n")

def send_password_reset_email(email: str, token: str):
    """
    Mock email sender for password reset.
    """
    reset_link = f"http://localhost:5173/reset-password?token={token}"
    print(f"\n{'='*50}\n[MOCK EMAIL] To: {email}\nSubject: SpecPulse Password Reset\nPlease click the link to reset your password: {reset_link}\n{'='*50}\n")
