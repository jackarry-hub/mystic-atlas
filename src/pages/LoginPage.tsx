import { LoginPanel, PageBackground } from "../components";
import { assets } from "../lib/assets";

export function LoginPage() {
  return (
    <PageBackground background={assets.backgrounds.login}>
      <section className="login-page login-page--reference">
        <div className="login-page__visual">
          <img alt="登录轨道平台主视觉" src={assets.heroes.loginOrbitPlatform} />
        </div>
        <div className="login-page__panel-wrap">
          <LoginPanel />
        </div>
      </section>
    </PageBackground>
  );
}
