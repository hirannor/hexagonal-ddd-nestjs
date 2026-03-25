import { RepositoryAdapter } from '@infrastructure/adapter/repository.adapter';
import { TypeOrmRepositoryModule } from '@adapter/repository/typeorm/type-orm-repository.module';
import { InMemoryRepositoryModule } from '@adapter/repository/inmemory/inmemory-repository.module';

const DEFAULT_REPOSITORY_ADAPTER: RepositoryAdapter =
  RepositoryAdapter.INMEMORY;

function resolveRepositoryAdapter(
  value: string | undefined,
): RepositoryAdapter {
  switch (value) {
    case RepositoryAdapter.TYPEORM:
      return RepositoryAdapter.TYPEORM;
    case RepositoryAdapter.INMEMORY:
      return RepositoryAdapter.INMEMORY;
    default:
      return DEFAULT_REPOSITORY_ADAPTER;
  }
}

export function selectRepositoryModule() {
  const repositoryAdapter: RepositoryAdapter = resolveRepositoryAdapter(
    process.env.REPOSITORY_ADAPTER,
  );

  switch (repositoryAdapter) {
    case RepositoryAdapter.TYPEORM:
      return TypeOrmRepositoryModule;
    case RepositoryAdapter.INMEMORY:
    default:
      return InMemoryRepositoryModule;
  }
}
