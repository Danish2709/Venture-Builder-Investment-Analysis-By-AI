import type React from "react"

interface PasswordResetEmailTemplateProps {
  name: string
  resetLink: string
  ipAddress?: string
  userAgent?: string
}

export const PasswordResetEmailTemplate: React.FC<PasswordResetEmailTemplateProps> = ({
  name,
  resetLink,
  ipAddress,
  userAgent,
}) => {
  return (
    <div
      style={{
        fontFamily: "system-ui, -apple-system, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "#ffffff",
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: "#f8fafc",
          padding: "32px 24px",
          textAlign: "center" as const,
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <div style={{ display: "inline-flex", alignItems: "center", gap: "12px" }}>
          <div style={{ position: "relative" }}>
            <img src="/1957-logo.png" alt="Hikma" style={{ height: "32px", width: "auto" }} />
            <div
              style={{
                position: "absolute",
                top: "-2px",
                right: "-2px",
                width: "8px",
                height: "8px",
                backgroundColor: "#2563eb",
                borderRadius: "50%",
              }}
            ></div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <h1
              style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "#111827",
                margin: "0",
              }}
            >
              Hikma
            </h1>
            <span
              style={{
                fontSize: "16px",
                color: "#2563eb",
                fontFamily: "Amiri, serif",
              }}
            >
              حكمة
            </span>
          </div>
        </div>
        <p
          style={{
            fontSize: "12px",
            color: "#6b7280",
            margin: "8px 0 0 0",
          }}
        >
          Designed by 1957 Ventures
        </p>
      </div>

      {/* Main Content */}
      <div style={{ padding: "40px 24px" }}>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "300",
            color: "#111827",
            marginBottom: "16px",
            textAlign: "center" as const,
          }}
        >
          Reset your password
        </h2>

        <p
          style={{
            fontSize: "16px",
            color: "#374151",
            lineHeight: "1.6",
            marginBottom: "24px",
          }}
        >
          Hi {name},
        </p>

        <p
          style={{
            fontSize: "16px",
            color: "#374151",
            lineHeight: "1.6",
            marginBottom: "32px",
          }}
        >
          We received a request to reset the password for your Hikma account. If you made this request, click the button
          below to reset your password.
        </p>

        {/* CTA Button */}
        <div style={{ textAlign: "center" as const, marginBottom: "32px" }}>
          <a
            href={resetLink}
            style={{
              display: "inline-block",
              backgroundColor: "#dc2626",
              color: "#ffffff",
              padding: "16px 32px",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "16px",
              fontWeight: "500",
              transition: "all 0.2s",
            }}
          >
            Reset Password
          </a>
        </div>

        {/* Alternative Link */}
        <div
          style={{
            backgroundColor: "#f9fafb",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "32px",
          }}
        >
          <p
            style={{
              fontSize: "14px",
              color: "#6b7280",
              margin: "0 0 12px 0",
            }}
          >
            If the button doesn't work, copy and paste this link into your browser:
          </p>
          <p
            style={{
              fontSize: "14px",
              color: "#dc2626",
              wordBreak: "break-all" as const,
              margin: "0",
            }}
          >
            {resetLink}
          </p>
        </div>

        {/* Security Information */}
        {(ipAddress || userAgent) && (
          <div
            style={{
              backgroundColor: "#f3f4f6",
              padding: "16px",
              borderRadius: "8px",
              marginBottom: "32px",
            }}
          >
            <p
              style={{
                fontSize: "14px",
                color: "#374151",
                margin: "0 0 8px 0",
                fontWeight: "500",
              }}
            >
              Request Details:
            </p>
            {ipAddress && (
              <p
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                  margin: "0 0 4px 0",
                }}
              >
                IP Address: {ipAddress}
              </p>
            )}
            {userAgent && (
              <p
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                  margin: "0",
                }}
              >
                Device: {userAgent}
              </p>
            )}
          </div>
        )}

        {/* Security Notice */}
        <div
          style={{
            border: "1px solid #fca5a5",
            backgroundColor: "#fef2f2",
            padding: "16px",
            borderRadius: "8px",
            marginBottom: "32px",
          }}
        >
          <p
            style={{
              fontSize: "14px",
              color: "#991b1b",
              margin: "0 0 8px 0",
              fontWeight: "500",
            }}
          >
            Important Security Notice:
          </p>
          <ul
            style={{
              fontSize: "14px",
              color: "#991b1b",
              margin: "0",
              paddingLeft: "20px",
              lineHeight: "1.5",
            }}
          >
            <li>This link will expire in 1 hour for security reasons</li>
            <li>If you didn't request this reset, please ignore this email</li>
            <li>Consider enabling two-factor authentication for additional security</li>
          </ul>
        </div>

        <p
          style={{
            fontSize: "16px",
            color: "#374151",
            lineHeight: "1.6",
            marginBottom: "8px",
          }}
        >
          If you have any concerns about your account security, please contact our support team immediately.
        </p>

        <p
          style={{
            fontSize: "16px",
            color: "#374151",
            lineHeight: "1.6",
            marginBottom: "8px",
          }}
        >
          Best regards,
          <br />
          The Hikma Security Team
        </p>
      </div>

      {/* Footer */}
      <div
        style={{
          backgroundColor: "#f8fafc",
          padding: "24px",
          borderTop: "1px solid #e2e8f0",
        }}
      >
        <div style={{ textAlign: "center" as const, marginBottom: "16px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <img src="/1957-logo.png" alt="1957 Ventures" style={{ height: "16px", width: "auto" }} />
            <span style={{ fontSize: "12px", color: "#6b7280" }}>© 2025 Hikma. All rights reserved.</span>
          </div>
        </div>

        <div style={{ textAlign: "center" as const }}>
          <p
            style={{
              fontSize: "12px",
              color: "#9ca3af",
              margin: "0 0 8px 0",
              lineHeight: "1.5",
            }}
          >
            This email was sent in response to a password reset request. If you have any questions, please contact our
            support team.
          </p>
          <p
            style={{
              fontSize: "12px",
              color: "#9ca3af",
              margin: "0",
              lineHeight: "1.5",
            }}
          >
            For security inquiries: security@hikma.com
          </p>
        </div>
      </div>
    </div>
  )
}
