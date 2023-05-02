import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTablets } from '../../api';
import { ProductList } from '../../components/ProductList';
import { Product } from '../../types/Product';

import {
  ReactComponent as IconArrowRight,
} from '../../images/icons/arrow_right.svg';
import { ReactComponent as IconHome } from '../../images/icons/home.svg';

import { EmptyCategory } from '../../components/EmptyCategory';
import { Loader } from '../../components/Loader';
import { ProductFilter } from '../../components/ProductFilter';

export const TabletsPage: React.FC = () => {
  const [tablets, setTablets] = useState<Product[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const tabletsData = await getTablets();

        setTablets(tabletsData);

        setIsLoading(false);
      } catch {
        if (!tablets.length) {
          setTablets([]);
        }
      }
    };

    fetchData();
  }, []);

  const phonesAmount = useMemo(() => tablets.length, [tablets]);

  if (isLoading) {
    return <Loader />;
  }

  if (tablets.length === 0) {
    return <EmptyCategory />;
  }

  return (
    <>
      <div className="product-page">
        <div className="product-page__container">
          <div className="path">
            <Link to="/" className="path__link">
              <IconHome />
            </Link>

            <IconArrowRight className="path__arrow" />

            <Link to="/tablets" className="path__link">
              <div className="path__text">Tablets</div>
            </Link>
          </div>

          <h1 className="product-page__title">Tablets</h1>

          <div className="product-page__amount">
            {phonesAmount === 1 ? '1 model' : `${phonesAmount} models`}
          </div>

          <ProductFilter />

          <ProductList products={tablets} />
        </div>
      </div>
    </>
  );
};