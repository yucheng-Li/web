import React, { useCallback } from 'react';

import logEvent, { AnalyticsEventImportance, CCAEventData } from 'base-ui/utils/logEvent';
import styles from './styles.module.css';

type FooterLinkType = {
  title: string;
  href: string;
  analyticsData: {
    name: string;
    event: CCAEventData;
    importance: AnalyticsEventImportance;
  };
};

type FooterCategoryProps = {
  title: string;
  links: FooterLinkType[];
};

function FooterLink({ title, href, analyticsData }: FooterLinkType) {
  const linkClick = useCallback(() => {
    logEvent(analyticsData.name, analyticsData.event, analyticsData.importance);
  }, [logEvent]);

  return (
    <li key={title} className={styles.footerCategoryListItem}>
      <a href={href} className={styles.footerCategoryLink} onClick={linkClick}>
        {title}
      </a>
    </li>
  );
}

export default function FooterCategory({ title, links }: FooterCategoryProps) {
  return (
    <div className={styles.footerCategory}>
      <h4 className={styles.footerCategoryTitle}>{title}</h4>
      <ul className={styles.footerCategoryList}>
        {links.map((link) => (
          <FooterLink title={link.title} href={link.href} analyticsData={link.analyticsData} />
        ))}
      </ul>
    </div>
  );
}
